-- Implementation Date: 2024-10-21
-- Author: Aditya Kr. Mishra

-- Advanced SQL: Window Functions
-- Ranking employees by salary within their respective departments

SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary,
    RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) as dept_salary_rank,
    AVG(e.salary) OVER (PARTITION BY e.department_id) as dept_avg_salary
FROM 
    employees e
JOIN 
    departments d ON e.department_id = d.department_id
WHERE 
    e.is_active = true
ORDER BY 
    d.department_name, dept_salary_rank;
