import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import slugify from 'slugify';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  slug: string;

  @Column()
  price: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @BeforeInsert()
  generateId() {
    if (this.id) {
      return;
    }
    this.id = uuidV4();
  }

  @BeforeInsert()
  generateSlug() {
    if (this.slug) {
      return;
    }
    this.slug = slugify(this.name);
  }
}
