// export const invoice = (purchases: any) => {
//     return (
//     `<div style="padding: 20px; background: #fff; width: 210mm; min-height: 297mm;">
// <div style="text-align: center; border-bottom: 2px solid #2362B4; margin-bottom: 10px; padding-bottom: 10px;">
//   <h1 style="font-size: 36px; color: #541414; font-weight: 700;">এস এম ট্রেডিং</h1>
//   <p style="font-size: 24px; color: #233E6F; font-weight: 600;">S M TRADING</p>
//   <p style="font-size: 14px; color: #2362B4;">All kinds of tractor parts...</p>
//   <p style="font-size: 14px; color: #666;">Address: Chachra Bazar, Jessore</p>
//   <p style="font-size: 14px; color: #2362B4;">Mobile: +8801700000000</p>
// </div>

// <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #2362B4; margin-bottom: 10px; padding-bottom: 10px;">
//   <div>
//     <p>Date: ${purchases.date}</p>
//     <p>Name: ${purchases.supplier}</p>
//   </div>
//   <div>
//     <p>Invoice No: ${purchases.invoiceNumber}</p>
//     <p>Phone: ${purchases.supplierPhone}</p>
//   </div>
// </div>
// <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
//   <thead>
//     <tr style="background-color: #2362B4; color: white; text-align: center;">
//       <th>Sl</th>
//       <th>Item Name</th>
//       <th>Item Brand</th>
//       <th>Item Category</th>
//       <th>Rate</th>
//       <th>Qty</th>
//       <th>Amount</th>
//     </tr>
//   </thead>
//   <tbody>
//     ${purchases?.purchaseProducts?.map((item: any, index: number) => `
//       <tr style="background-color: ${index % 2 === 0 ? '#f9f9f9' : '#e9f4ff'};">
//         <td>${index + 1}</td>
//         <td>${item.product.name}</td>
//         <td>${item.product?.brand?.name}</td>
//         <td>${item.product?.category?.name}</td>
//         <td>৳${item.price}</td>
//         <td>${item.quantity}</td>
//         <td>৳${item.price * item.quantity}</td>
//       </tr>
//     `).join('')}
//   </tbody>
// </table>
// </div>
//     `)};