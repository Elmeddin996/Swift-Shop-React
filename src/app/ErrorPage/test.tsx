import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProductContext } from "../../hooks";

interface Product {
  id: number;
  name: string;
}

export const Test: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState(null);
  const { productList } = useProductContext();

  const targetProduct = productList.find(
    (product:Product) => product.id === selectedId
  );
  return (
    <React.Fragment>
      {productList?.data.map((data: any) => (
        <motion.div layoutId={data.id} onClick={() => setSelectedId(data.id)}>
          <motion.h5>{data.description}</motion.h5>
          <motion.h2>{data.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{targetProduct.description}</motion.h5>
            <motion.h2>{targetProduct.title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};
