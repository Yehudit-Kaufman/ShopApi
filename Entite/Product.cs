﻿using System;
using System.Collections.Generic;

namespace Entite;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public double Price { get; set; }

    public int CategoryId { get; set; }

    public string Descreption { get; set; } = null!;
    public string? Image { get; set; } = null;

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
