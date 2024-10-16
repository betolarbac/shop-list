import { CardsProductExpiration } from "./_components/cards-product-expiration";
import { getExpiration } from "./action";
import { ExpirationTable } from "./_components/expiration-table";
import { ExpirationUpsertDialog } from "./_components/expiration-upsert-dialog";

export default async function Page() {
  const expiration = await getExpiration();

  return (
    <>
      <div className="scrollContainer h-[calc(100vh-60px)] overflow-auto pb-10">
        <div className="justify-center items-center ">
          <div className="flex items-center justify-between mx-auto max-w-5xl px-6 py-8">
            <h3 className="text-[16px] leading-[20px] tracking-[-0.416px] text-slate-12 font-bold lg:text-[28px] lg:leading-[34px]">
              Produtos para vencer
            </h3>

            <ExpirationUpsertDialog />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-start mx-auto max-w-5xl px-6 gap-4 lg:gap-8">
            <CardsProductExpiration />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-start mx-auto max-w-5xl px-6 gap-4 lg:gap-8 pt-8">
            <ExpirationTable data={expiration} />
          </div>
        </div>
      </div>
    </>
  );
}
