import {Prisma_Client} from "@prisma/client";

const prisma= new Prisma_Client({
    log:["query"],
});

export default prisma;