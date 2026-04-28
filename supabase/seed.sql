-- Seed data for SIRCOM sources

INSERT INTO sources (name, type, url, category, reliability_base) VALUES
('Diario Oficial de la Federación', 'official', 'https://dof.gob.mx/', 'public_info', 95),
('Gobierno de Morelos', 'official', 'https://morelos.gob.mx/', 'public_info', 90),
('Protección Civil / SMN', 'official', 'https://smn.conagua.gob.mx/es/', 'risk_alert', 95),
('Portal de Convocatorias', 'official', 'https://www.gob.mx/busqueda?utf8=%E2%9C%93&site=convocatorias', 'opportunity', 90),
('Diario de Morelos', 'news_secondary_signal', 'https://www.diariodemorelos.com/', 'news', 60)
ON CONFLICT DO NOTHING;
