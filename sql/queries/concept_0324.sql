-- Implementation Date: 2024-08-06
-- Author: Aditya Kr. Mishra

-- Advanced SQL: Common Table Expressions (CTEs)
-- Recursive CTE to build an employee-manager hierarchy tree

WITH RECURSIVE EmployeeHierarchy AS (
    -- Base case: Top level managers (CEO, etc.)
    SELECT 
        employee_id, first_name, manager_id, 1 as hierarchy_level,
        CAST(first_name AS VARCHAR(255)) as hierarchy_path
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive step: Employees reporting to the previous level
    SELECT 
        e.employee_id, e.first_name, e.manager_id, eh.hierarchy_level + 1,
        CAST(eh.hierarchy_path || ' -> ' || e.first_name AS VARCHAR(255))
    FROM employees e
    INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM EmployeeHierarchy ORDER BY hierarchy_path;
