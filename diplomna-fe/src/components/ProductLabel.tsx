import { FC } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Product } from "../interface";

const ProductLabel: FC<Product> = ({name, grams}) =>
{
    return(
        <div className="badge badge-warning gap-2 m-2">
            <MdOutlineCancel />
            {grams} grams {name}
        </div>
    );
}

export default ProductLabel;