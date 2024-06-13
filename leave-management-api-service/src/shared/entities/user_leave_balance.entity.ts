import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { CompanyLeave } from './company_leaf.entity';

@Entity('user_leave_balance')
export class UserLeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userLeaveBalances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CompanyLeave, (companyLeave) => companyLeave.userLeaveBalances)
  @JoinColumn({ name: 'company_leave' })
  company_leave: CompanyLeave;

  @Column({ type: 'float' })
  prorated_balance: number;

  @Column({ type: 'float' })
  current_balance: number;
}
