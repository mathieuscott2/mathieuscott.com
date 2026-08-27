-- Safe public read surface for /competitive-analysis
-- Run this in Supabase SQL Editor once.

create or replace view public_competitive_matrix as
select
  cf.id as fact_id,
  c.name as company,
  p.name as product,
  cap.capability_code,
  cap.l1_domain,
  cap.l2_capability,
  cap.l3_feature,
  cap.ctv_native_relevance,
  cf.status,
  cf.maturity_score,
  cf.format,
  cf.environment,
  cf.stage,
  cf.execution_mode,
  cf.media_model,
  cf.confidence,
  cf.strategic_significance,
  cf.peer39_position,
  cf.last_verified,
  coalesce(
    (
      select array_agg(distinct pl.platform_name order by pl.platform_name)
      from integrations i
      join platforms pl on pl.id = i.platform_id
      where i.company_id = cf.company_id
        and i.capability_id = cf.capability_id
        and i.public_visible = true
    ),
    array[]::text[]
  ) as platforms,
  coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'claim', e.claim,
          'title', s.title,
          'url', s.url
        )
        order by e.created_at asc
      )
      from evidence e
      join sources s on s.id = e.source_id
      where e.fact_id = cf.id
        and s.public_visible = true
    ),
    '[]'::jsonb
  ) as evidence
from competitive_facts cf
join companies c on c.id = cf.company_id
left join products p on p.id = cf.product_id
join capabilities cap on cap.id = cf.capability_id
where cf.public_visible = true
  and c.public_visible = true
  and cap.public_visible = true
  and (p.id is null or p.public_visible = true);

grant usage on schema public to anon, authenticated;
grant select on public_competitive_matrix to anon, authenticated;

comment on view public_competitive_matrix is
  'Public-safe competitive intelligence matrix view used by mathieuscott.com/competitive-analysis';
