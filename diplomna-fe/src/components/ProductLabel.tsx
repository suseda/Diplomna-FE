import { FC } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Product } from "../interface";

const ProductLabel: FC<Product> = ({productName, grams, onRemove}) =>
{

    const handleRemove = () => {
        if (onRemove) {
            onRemove(productName);
          }
      };

    return(
        <div className="badge badge-warning gap-2 m-2" onClick={handleRemove}>
            <MdOutlineCancel />
            {grams} grams {productName}
        </div>
    );
}

export default ProductLabel;