import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service.js';


@Injectable()
export class NotificationService {

     constructor(
        @Inject(forwardRef(() => EnrollmentService))
        private enrollmentService: EnrollmentService ){}


    
   sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent',
      student: studentName,
      notification: message,
    };
  }


  checkEnrollmentAndNotify(studentName: string, courseId: string){
        const enrollments = this.enrollmentService.getEnrollments();
        return {
         message: `Checked enrollments for ${studentName} (course ${courseId})`,
         enrollments,
      };
  }


}
