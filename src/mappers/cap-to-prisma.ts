export function capWhereToPrisma(where: any[]): any {
  const prismaWhere: any = {};

  for (let i = 0; i < where.length; i++) {
    const token = where[i];

    if (token.ref) {
      const field = token.ref[0];
      const opToken = where[i + 1];
      const valToken = where[i + 2];

      if (typeof opToken === "string" && valToken?.val !== undefined) {
        const value = valToken.val;

        switch (opToken.toLowerCase()) {
          case "=":
          case "eq":
            prismaWhere[field] = value;
            break;
          case "!=":
          case "ne":
            prismaWhere[field] = { not: value };
            break;
          case "like":
            prismaWhere[field] = { contains: value };
            break;
          case "gt":
            prismaWhere[field] = { gt: value };
            break;
          case "lt":
            prismaWhere[field] = { lt: value };
            break;
          case "ge":
            prismaWhere[field] = { gte: value };
            break;
          case "le":
            prismaWhere[field] = { lte: value };
            break;
        }
        i += 2;
      }
    }
  }

  return prismaWhere;
}
