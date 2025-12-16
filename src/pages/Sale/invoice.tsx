import moment from "moment";
import React from "react";

type Product = {
  product: { name: string };
  price: number;
  warranty: Date;
  quantity: number;
};

type Sale = {
  customerName: string;
  invoiceNumber: string;
  customerPhone: string;
  saleProducts: Product[];
  price: number;
  advance?: number;
  due?: number;
  receiveAmount?: number;
};

interface ProductInvoiceProps {
  sale?: Sale;
}

const SaleInvoice: React.FC<ProductInvoiceProps> = ({ sale }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.name}>এস এম ট্রেডিং</h1>
        <p style={styles.eng}>S M TRADING</p>
        <p style={styles.tag}>
          সকল প্রকার ট্রাক্টর পার্টস, রোটাভেটের, টায়ার, মবিল, বিয়ারিং ও
          মার্বেল ব্লকের আমদানি ও সরবরাহকারী
        </p>
        <p style={styles.address}>ঠিকানাঃ চাঁচড়া বাজার মোড়, যশোর।</p>
        <p style={styles.contact}>
          মোবাইলঃ +৮৮ ০১৭০০-৯২৯০৬৬, +৮৮ ০১৬৮০-৪০৯১৮৬, +৮৮ ০১৯৩৯-০১২২১১
        </p>
        <p style={styles.email}>E-mail: smtrading222@gmail.com</p>
      </div>

      <div style={styles.details}>
        <div>
          <p>Date: 21-Feb-25</p>
          <p>Name: {sale?.customerName}</p>
        </div>
        <div>
          <p>Invoice No: {sale?.invoiceNumber}</p>
          <p>Phone No: {sale?.customerPhone}</p>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Sl</th>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Rate</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Warrenty</th>
          </tr>
        </thead>
        <tbody>
          {sale?.saleProducts &&
            sale?.saleProducts?.length > 0 &&
            sale?.saleProducts.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item?.product?.name}</td>
                <td style={styles.td}>৳{item?.price}</td>
                <td style={styles.td}>{item?.quantity}</td>
                <td style={styles.td}>৳{item?.price * item?.quantity}</td>
                <td style={styles.td}>{item?.warranty ? moment(item?.warranty).format('DD/MM/YYYY'): 'N/M'}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div style={styles.totalSection}>
        <div style={styles.row}>
          <div style={styles.label}>Grand Total</div>
          <div style={styles.amount}>৳{sale?.price}</div>
        </div>
        <div style={styles.row}>
          <div style={styles.label}>Receive Amount</div>
          <div style={styles.amount}>৳{sale?.receiveAmount || 0}</div>
        </div>
        <div style={styles.row}>
          <div style={styles.label}>Due</div>
          <div style={styles.amount}>৳{(Number(sale?.price) - Number(sale?.receiveAmount)) || 0}</div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    borderBottom: "2px solid #2362B4",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  name: {
    fontSize: "36px",
    color: "#541414",
    fontWeight: "700",
    margin: "0",
  },
  eng: {
    fontSize: "24px",
    color: "#233E6F",
    fontWeight: "600",
    margin: "5px 0",
  },
  tag: {
    fontSize: "14px",
    color: "#2362B4",
    maxWidth: "600px",
    margin: "10px auto",
  },
  address: {
    fontSize: "14px",
    color: "#666",
    margin: "5px 0",
  },
  contact: {
    fontSize: "14px",
    color: "#2362B4",
    margin: "5px 0",
  },
  email: {
    fontSize: "14px",
    color: "#C86A14",
    margin: "5px 0",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "2px solid #2362B4",
    paddingBottom: "10px",
    marginBottom: "20px",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "left",
  },
  th: {
    backgroundColor: "#2362B4",
    color: "#fff",
    fontWeight: "bold",
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  oddRow: {
    backgroundColor: "#f9f9f9",
  },
  evenRow: {
    backgroundColor: "#e9f4ff",
  },
  totalSection: {
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "20px",
  },
  row: {
    display: "flex",
    width: "50%",
    border: "1px solid #C86A14",
    backgroundColor: "#f9f9f9",
    marginBottom: "-1px",
  },
  label: {
    width: "60%",
    textAlign: "left",
    padding: "10px",
    fontWeight: "bold",
    borderRight: "1px solid #C86A14",
  },
  amount: {
    width: "40%",
    textAlign: "right",
    padding: "10px",
    fontWeight: "bold",
  },
};

export default SaleInvoice;
