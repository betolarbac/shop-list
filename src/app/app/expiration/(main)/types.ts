import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getExpiration } from "./action";

export type Expiration = ReturnTypeWithoutPromise<typeof getExpiration >[0]