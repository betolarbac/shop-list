import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getProducts } from "./actions";

export type Product = ReturnTypeWithoutPromise<typeof getProducts>[0]

