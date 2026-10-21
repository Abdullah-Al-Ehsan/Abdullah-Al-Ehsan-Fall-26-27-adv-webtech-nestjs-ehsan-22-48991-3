
import {  Body,  Controller,  Delete,  Get,  Param,  ParseIntPipe,  Patch,  Post,  Put,  Query,} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';



@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }


  @Get()
  findAll() {
    return this.productsService.getAllProducts();
  }


  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.productsService.searchProducts(keyword);
  }


  @Get('category/:cat')
  findByCategory(@Param('cat') cat: string) {
    return this.productsService.getProductsByCategory(cat);
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }


  @Patch(':id/toggle')
  toggle(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.toggleProductActive(id);
  }


  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PartialUpdateProductDto,
  ) {
    return this.productsService.patchProduct(id, dto);
  }


  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.replaceProduct(id, dto);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }


}
