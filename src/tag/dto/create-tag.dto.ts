export class CreateTagDto {
  name: string;
  description: string;
  step: number;
  isInstant: boolean;
  cronExpression: string;
  isActive: boolean;
}
