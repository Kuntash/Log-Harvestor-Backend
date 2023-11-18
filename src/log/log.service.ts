import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateLogBody, GetLogParams } from './log.types';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './log.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(body: CreateLogBody) {
    /* TODO: validations */
    if (!body?.userId) {
      throw new HttpException('userId is missing.', HttpStatus.UNAUTHORIZED);
    }

    if (
      !body?.level ||
      !body?.message ||
      !body?.resourceId ||
      !body?.timestamp ||
      !body?.traceId ||
      !body?.spanId ||
      !body?.commit ||
      !body?.metadata ||
      !body?.metadata?.parentResourceId
    ) {
      throw new HttpException(
        'Bad Request, required fields missing.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdLog = new this.logModel(body);

    try {
      const createdLogDocument = await createdLog.save();
      return createdLogDocument;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async get(queryParams: GetLogParams) {
    /* Filter logic incremental changes
      1. Exact match search. [ done ]
      2. For message, implement search where user can search by the contents of the message [ regex search]. [ done ]
      3. For timestamp implement a max and min range. 
    */

    const filters: FilterQuery<Log> = {};

    if (!queryParams?.userId) {
      throw new HttpException('user id missing', HttpStatus.UNAUTHORIZED);
    }

    filters.userId = queryParams?.userId;

    if (queryParams?.level) filters.level = queryParams?.level;

    if (queryParams?.resourceId) filters.resourceId = queryParams?.resourceId;

    if (queryParams?.traceId) filters.traceId = queryParams?.traceId;

    if (queryParams?.spanId) filters.spanId = queryParams?.spanId;

    if (queryParams?.commit) filters.commit = queryParams?.commit;

    if (queryParams?.timestamp)
      filters.timestamp = new Date(queryParams?.timestamp);

    if (queryParams?.['metadata_parentResourceId']) {
      filters['metadata.parentResourceId'] =
        queryParams?.['metadata_parentResourceId'];
    }

    if (queryParams?.message) {
      if (queryParams?.messageExactMatch) {
        filters.message = queryParams?.message;
      } else {
        filters.message = {
          $regex: new RegExp(queryParams?.message, 'i'),
        };
      }
    }

    if (
      !queryParams?.timestamp &&
      queryParams?.min_timestamp &&
      queryParams?.max_timestamp
    ) {
      filters.timestamp = {
        $gte: new Date(queryParams?.min_timestamp),
        $lte: new Date(queryParams?.max_timestamp),
      };
    }

    try {
      const filteredDocuments = await this.logModel.find(filters, {
        userId: 0,
        __v: 0,
      });
      return filteredDocuments;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
