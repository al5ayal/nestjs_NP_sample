import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Render('products/list')
  async prodvtslist() {
    return {
      products: await this.productsService.getAll(),
      activePage: 'products',
    };
  }

  @Get('add')
  @Render('products/productForm')
  async addProductView() {
    return {
      product: await this.productsService.getAll(),
      activePage: 'add_product',
    };
  }

  @Post('add')
  async addProduct(@Body() body, @Res() res) {
    try {
      const { name, description, price } = body;
      const newProduct = await this.productsService.createProduct({
        name,
        description,
        price,
      });

      if (newProduct) {
        return res.redirect('/admin/products');
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Get('edit/:id')
  @Render('products/productForm')
  async editProductView(@Param('id') id) {
    return {
      product: await this.productsService.findById(id),
      activePage: 'edit_product',
      productAction: 'edit',
    };
  }

  @Post('edit/:id')
  async editProduct(@Param('id') id, @Body() body, @Res() res) {
    try {
      const product = await this.productsService.findById(id);
      product.name = body.name;
      product.description = body.description;
      product.price = body.price;
      const productUpdated = await this.productsService.updateProduct(product);
      if (productUpdated) return res.redirect('/admin/products');
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Get('delete/:id')
  async deleteProduct(@Param('id') id, @Res() res) {
    try {
      const productDeleted = await this.productsService.deleteProduct(id);
      if (productDeleted) return res.redirect('/admin/products');
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
