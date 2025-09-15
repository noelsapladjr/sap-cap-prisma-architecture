import { PrismaClient } from "@prisma/client";
import { capWhereToPrisma } from "../mappers/cap-to-prisma";
import { businessRules } from "../business-rules";

const prisma = new PrismaClient();

export function registerGenericHandlers(srv: any) {
  for (const [capEntityName, capEntity] of Object.entries(srv.entities)) {
    const prismaModelName = capEntityName.split(".").pop()?.toLowerCase();
    if (!prismaModelName || !(prisma as any)[prismaModelName]) {
      console.warn(`[WARN] Prisma model não encontrado para ${capEntityName}`);
      continue;
    }

    const model = (prisma as any)[prismaModelName];
    const entityRules = businessRules[prismaModelName] || {};

    srv.on("READ", capEntity, async (req: any) => {
      const where = req.query.SELECT?.where
        ? capWhereToPrisma(req.query.SELECT.where)
        : undefined;
      return model.findMany({ where });
    });

    srv.on("CREATE", capEntity, async (req: any) => {
      if (entityRules.beforeCreate) {
        await entityRules.beforeCreate(req);
        if (req.errors?.length) return; 
      }

      const created = await model.create({ data: req.data });

      return created;
    });
    srv.on("UPDATE", capEntity, async (req: any) => {
      const { id, id_interno, ...rest } = req.data;
      if (!id && !id_interno) {
        req.error(
          400,
          "É necessário fornecer id ou id_interno para atualizar."
        );
      }
      return model.update({
        where: id ? { id } : { id_interno },
        data: rest,
      });
    });

    srv.on("DELETE", capEntity, async (req: any) => {
      const { id, id_interno } = req.data;
      if (!id && !id_interno) {
        req.error(400, "É necessário fornecer id ou id_interno para deletar.");
      }
      return model.delete({
        where: id ? { id } : { id_interno },
      });
    });
  }
}
