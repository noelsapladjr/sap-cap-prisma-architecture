using db from '../db/schema';

service CatalogService @(path: '/catalog') {
    entity Users as projection on db.Users;
    entity Products as projection on db.Products;
}
