import { PartialType } from '@nestjs/swagger';
import { CreateSendMailDto } from './create-send_mail.dto';

export class UpdateSendMailDto extends PartialType(CreateSendMailDto) {}
