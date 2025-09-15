namespace db;

@cds.persistence.exists
@cds.persistence.table: 'users'
@cds.persistence.schema: 'public'
entity Users {
    key id         : UUID;
    id_interno     : Integer;
    createdAt      : Timestamp;
    createdBy      : String;
    modifiedAt     : Timestamp;
    modifiedBy     : String;
    name           : String;
    email          : String;
}

@cds.persistence.exists
@cds.persistence.table: 'products'
@cds.persistence.schema: 'public'
entity Products {
    key id         : UUID;
    id_interno     : Integer;
    createdAt      : Timestamp;
    createdBy      : String;
    modifiedAt     : Timestamp;
    modifiedBy     : String;
    name           : String;
    price          : Decimal(10,2);
}
