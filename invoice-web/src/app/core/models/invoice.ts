import { CustomerDto } from "../../services/customer-service.service"

export interface InvoiceToSave {
    customerId: number,
    invoiceDetails:InvoiceDetailToSave[]
}

export interface InvoiceDetailToSave{
    productName: string,
    quantity: number,
    unitPrice: number
}

export interface InvoiceDto{
    invoiceId: number,
    date: string,
    total: number,
    customer: CustomerDto,
    invoiceDetails:InvoiceDetailDto[]
}

export interface InvoiceDetailDto{
    id:number,
    productName: string,
    quantity: number,
    unitPrice: number
}