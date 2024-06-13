export class CreateUserLeafDto {
  userId: number;
  leaveTypeName: string;
  halfDay: boolean;
  fromDate: Date;
  toDate: Date;
  assignedToId?: number;
  status: string;
  isAutoApproved: boolean;
  comments: string;
  attachments: string;
  updatedById?: number;
}
