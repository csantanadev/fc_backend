CREATE OR REPLACE VIEW public.v_users
 AS
 SELECT u.id,
    u.name,
    u.username,
    u.email,
    u.phone,
    u.cpf,
    u.status,
    u.date_birth,
    u.mother_name,
    u.create_at,
    u.update_at,
    EXTRACT(day FROM (now() - u.date_birth::timestamp with time zone) / 365::double precision) AS age,
    count(*) OVER () AS count
   FROM users u;

ALTER TABLE public.v_users
    OWNER TO postgres;