CREATE TABLE IF NOT EXISTS public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    phone text COLLATE pg_catalog."default" NOT NULL,
    cpf text COLLATE pg_catalog."default" NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL DEFAULT 'A'::text,
    create_at timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_birth timestamp(3) without time zone NOT NULL,
    mother_name text COLLATE pg_catalog."default" NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
-- Index: users_username_key

-- DROP INDEX IF EXISTS public.users_username_key;

CREATE UNIQUE INDEX IF NOT EXISTS users_username_key
    ON public.users USING btree
    (username COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;