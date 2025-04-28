import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalRequestService {
  async requestToExternalServer(tagId: number, data: any) {
    const url = `https://aws/docu-auto-serverless/api/handle-tag/${tagId}`;

    const response = await axios.post(url, data);
    return response.data;
  }
}
