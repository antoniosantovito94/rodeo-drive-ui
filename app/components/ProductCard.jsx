import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-media" href={product.href}>
        <img src={product.image} alt={product.alt} />
        {product.badge ? (
          <span className={`badge ${product.badgeClass}`}>{product.badge}</span>
        ) : null}
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">
          &euro; {product.price}
          {product.oldPrice ? <span>&euro; {product.oldPrice}</span> : null}
        </p>
      </div>
    </article>
  );
}
