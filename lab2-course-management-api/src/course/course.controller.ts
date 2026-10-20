import { Controller, Get, Param, Post, Body, Put, Patch, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { extname } from 'path';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.updateCourse(id, dto);
  }

  @Patch(':id')
  patchCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.patchCourse(id, dto);
  }


  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }



  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),

      fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png', '.pdf'];
        const ext = extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
          cb(null, true);
        }
        else {
          cb(
            new BadRequestException(`Unsupported file type ${ext}. Only .jpg, .jpeg, .png, .pdf files are allowed`),
            false,
          );
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }
    }),
  )

  uploadCourseMaterial(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        return this.courseService.uploadCourseMaterial(id, file);
  }


}
