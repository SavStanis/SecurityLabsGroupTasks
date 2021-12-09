create table encrypted_data (
    id      serial primary key,
    data    text,
    iv      text,
    tag     text
);

create table users (
    id                      serial primary key,
    login                   text,
    password                text,
    encrypted_address_id    integer,
    encrypted_phone_id      integer,
    FOREIGN KEY(encrypted_phone_id) REFERENCES encrypted_data(id) ON DELETE SET NULL,
    FOREIGN KEY(encrypted_address_id) REFERENCES encrypted_data(id) ON DELETE SET NULL
);
