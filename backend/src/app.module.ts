import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Parent } from './parents/parent.entity';
import { ParentsModule } from './parents/parents.module';
import { Student } from './students/student.entity';
import { StudentsModule } from './students/students.module';
import { Class } from './classes/class.entity';
import { ClassesModule } from './classes/classes.module';
import { ClassRegistration } from './registrations/class-registration.entity';
import { RegistrationsModule } from './registrations/registrations.module';
import { Subscription } from './subscriptions/subscription.entity';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASSWORD', '123456'),
        database: config.get<string>('DB_NAME', 'teencare'),
        entities: [Parent, Student, Class, ClassRegistration, Subscription],
        synchronize: true,
      }),
    }),
    ParentsModule,
    StudentsModule,
    ClassesModule,
    RegistrationsModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
