import { ProductTable } from "./_components/product-tablet";
import { ProductUpsertDialog } from "./_components/product-upsert-dialog";
import { getProducts } from "./actions";
export default async function Page() {

  const  products = await getProducts();


  return (
    <>
      <div className="scrollContainer h-[calc(100vh-60px)] overflow-auto pb-10">
        <div className="justify-center items-center ">
          <div className="flex items-center justify-between mx-auto max-w-5xl px-6 py-8">
            <h3 className="text-[16px] leading-[20px] tracking-[-0.416px] text-slate-12 font-bold lg:text-[28px] lg:leading-[34px]">
              Lista de Compras
            </h3>

            <ProductUpsertDialog />
          </div>

          <div className="mx-auto max-w-5xl px-6">
          <ProductTable  data={products}/>
          </div>
        </div>
      </div>
    </>
  );
}
