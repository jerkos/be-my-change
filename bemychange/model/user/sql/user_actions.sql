WITH actions_for_date AS (
    SELECT COALESCE(jsonb_agg(_), '[]' :: JSONB) AS result
    FROM (
           SELECT
             *,
             (SELECT row_to_json(_)
              FROM (
                     SELECT *
                     FROM actions
                     WHERE actions.id = user_actions.action_id
                   ) _) AS action,
             (SELECT jsonb_agg(row_to_json(_))
              FROM (
                     SELECT *
                     FROM user_action_tag_mapping
                     WHERE user_actions.action_id = user_action_tag_mapping.user_action_id
                   ) _) AS tags
           FROM user_actions
           WHERE :requested_date BETWEEN
                 user_actions.start_date AND user_actions.end_date
                 AND user_actions.user_id = :user_id
         ) _
),
    counting_commentaries AS (
      SELECT COALESCE(jsonb_agg(_), '[]'::jsonb) as commentaries
      FROM (
             SELECT
               action_id,
               count(1)
             FROM commentaries, actions_for_date
             WHERE exists(
                 SELECT 1
                 FROM jsonb_array_elements(actions_for_date.result) t
                 WHERE (t ->> 'action_id') :: BIGINT = commentaries.action_id
             )
             GROUP BY 1
           ) _
  ),
    counting_participants AS (
      SELECT COALESCE(jsonb_agg(_), '[]'::jsonb) as participants
      FROM (
             SELECT
               action_id,
               count(1)
             FROM user_actions, actions_for_date
             WHERE exists(
                 SELECT 1
                 FROM jsonb_array_elements(actions_for_date.result) t
                 WHERE (t ->> 'action_id') :: BIGINT = user_actions.action_id
             )
             GROUP BY 1
           ) _
  )

SELECT row_to_json(_)::TEXT AS result
FROM (
       SELECT
         (SELECT result
          FROM actions_for_date) AS actions,
         (SELECT json_build_object(
             'commentaries', counting_commentaries.commentaries,
             'participants', counting_participants.participants,
             'ressources', '[]'::jsonb
         )) AS counting
       from counting_participants, counting_commentaries
     ) _