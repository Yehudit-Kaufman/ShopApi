﻿using Entite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryProduct : IRepositoryProduct
    {

        ShopApiContext _contex;

        public RepositoryProduct(ShopApiContext shopApiContext)
        {
            _contex = shopApiContext;
        }
        //string filePath = "M:\\Api\\Shope\\Shope\\TextFile.txt";
        public async Task<List<Product>> GetProducts(int ? minPrice, int ? maxPrice, int ?[] categoryIds, string ? desc)
        {

            var query = _contex.Products.Where(Product =>
            (desc==null ?(true):(Product.Descreption.Contains(desc)))
 &&(minPrice == null ? (true) : (Product.Price >= minPrice))
 && ((maxPrice == null) ? (true) : (Product.Price <= maxPrice))
  && ((categoryIds.Length == 0) ? (true) : (categoryIds.Contains(Product.CategoryId))))
.OrderBy(Product => Product.Price).Include(p=>p.Category);
            Console.WriteLine(query.ToQueryString());
            List<Product> products = await query.ToListAsync();
            return products;

        }

        //public async Task<Product> GetProductById(int id)
        //{
        //    return await _contex.Products.FirstOrDefaultAsync(Product => Product.ProductId == id);

        //}

        //public async Task<Product> AddProduct(Product product)
        //{
        //    _contex.Products.AddAsync(product);
        //    await _contex.SaveChangesAsync();
        //    return product;

        //}



        //public async Task UpdateProduct(int id, Product value)
        //{
        //    _contex.Products.Update(value);
        //    await _contex.SaveChangesAsync();


        //}
    }
}
