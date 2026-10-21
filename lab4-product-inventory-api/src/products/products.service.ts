import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';


@Injectable()
export class ProductsService {

    constructor(
          @InjectRepository(Products)
          private productsRepo: Repository<Products>,
    ) { }


    private async getProductOrFail(id: number): Promise<Products> {
        const product = await this.productsRepo.findOne({ where: { id: id } });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }


    async createProduct(dto: CreateProductDto) {               
        const product = this.productsRepo.create(dto);   
        const saved = await this.productsRepo.save(product);
        return { message: 'Product created successfully', data: saved };
    }


    async getAllProducts() {
        const products = await this.productsRepo.find( {
            order: { createdAt: 'DESC' },
        });

        return {
            message: 'Products fetched successfully',
            count: products.length,
            data: products,
        };
    }


    async getProductById(id: number) {
        const product = await this.getProductOrFail(id);
        return { message: 'Product fetched successfully', data: product };
    }


    async patchProduct(id: number, dto: PartialUpdateProductDto) {
        const product = await this.getProductOrFail(id);
        Object.assign(product, dto);
        const saved = await this.productsRepo.save(product);
        return { message: 'Product updated successfully', data: saved };
    }


    async replaceProduct(id: number, dto: UpdateProductDto) {
        const product = await this.getProductOrFail(id);
        Object.assign(product, {
            description: null,
            stock: 0,
            isActive: true,
            ...dto,
        });
        const saved = await this.productsRepo.save(product);
        return { message: 'Product replaced successfully', data: saved };
    }


    async deleteProduct(id: number) {
        await this.getProductOrFail(id);
        await this.productsRepo.delete(id);
        return { message: 'Product deleted successfully', id };
    }


    async getProductsByCategory(category: string) {
        const products = await this.productsRepo.find({
            where: { category },
            order: { createdAt: 'DESC' },
        });
        return {
            message: `Products in category "${category}" fetched successfully`,
            count: products.length,
            data: products,
        };
    }


    async searchProducts(keyword: string) {
        const term = keyword ?? '';
        const products = await this.productsRepo.find({
            where: { name: ILike(`%${term}%`) },
        });
        return {
            message: 'Search completed successfully',
            count: products.length,
            data: products,
        };
    }
    

    async toggleProductActive(id: number) {
        const product = await this.getProductOrFail(id);
        product.isActive = !product.isActive;
        const saved = await this.productsRepo.save(product);
        return { message: 'Product status toggled successfully', data: saved };
    }


}
