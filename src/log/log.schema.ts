import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({
  collection: 'Logs',
})
export class Log {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  resourceId: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  traceId: string;

  @Prop({ required: true })
  spanId: string;

  @Prop({ required: true })
  commit: string;

  @Prop({
    required: true,
    type: {
      parentResourceId: String,
    },
  })
  metadata: {
    parentResourceId: string;
  };
}

export const LogSchema = SchemaFactory.createForClass(Log);
