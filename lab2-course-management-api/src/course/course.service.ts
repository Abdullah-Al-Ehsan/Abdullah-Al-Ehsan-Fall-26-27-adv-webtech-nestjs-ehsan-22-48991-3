import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Express } from 'express';
import { Multer } from 'multer';


@Injectable()
export class CourseService {

    getAllCourses() {
        return { message: 'All courses fetched successfully', data: [] };
    }

    getCourseById(id: string) {
        return { message: 'Course fetched successfully', id };
    }

    createCourse(dto: CreateCourseDto) {
        return { message: 'Course created successfully', data: dto };
    }

    updateCourse(id: string, dto: UpdateCourseDto) {
        return { message: 'Course updated successfully', id, data: dto };
    }


    patchCourse(id: string, dto: UpdateCourseDto) {
        return {
            message: 'Course patched successfully', id,
            updatedFields: Object.keys(dto)
        };
    }

    deleteCourse(id: string) {
        return { message: 'Course deleted successfully', id };
    }


    uploadCourseMaterial(id: string, file: Express.Multer.File) {
        if (!file) {
            return { message: 'No file uploaded' };
        }
        return {
            message: 'Course material uploaded successfully',
            courseId: id,
            fileName: file.originalname,
            path: file.path,
        };
    }

}
