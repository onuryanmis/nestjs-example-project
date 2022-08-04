import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Category } from '../category/category.entity';
import slugify from 'slugify';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: '255' })
  title: string;

  @Index({ unique: true })
  @Column({ length: '300' })
  slug: string;

  @Column({ length: '250' })
  description: string;

  @Column({ type: 'text' })
  fullContent: string;

  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public updateSlug() {
    this.slug = slugify(this.title, { lower: true });
  }
}
