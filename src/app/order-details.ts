export class OrderDetail {
    public building_detail!:string;
    public product!: string;
    public product_quantity!: number;
    public building_id!: string;
}

export class Building {
    public id!: string;
    public remark!: string;
    public building_description!: string;
    public building_name!: string;
}

export class Product {
    public id!: string;
    public product_code!: string;
    public product_description!: string;
    public product_name!: string;
}

