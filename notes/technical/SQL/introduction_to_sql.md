# **Introduction to SQL: Think Like a Database Engineer**

*An introductory lecture in the style of a Stanford computer science professor.*

Let's approach SQL not as a programming language you need to memorize, but as a way of thinking about data.

Imagine you are building the next Amazon, Instagram, or Netflix.

Millions of people are using your application. Every second:

- Someone creates an account.
- Someone places an order.
- Someone makes a payment.
- Someone watches a movie.
- Someone writes a review.

Where do you store all this information? How do you retrieve it? How do you make sure the right customer sees the right order?

This is where **SQL comes in.**

# **1. What is SQL?**

SQL stands for **Structured Query Language**.

It is a language used to communicate with relational databases.

Let's break that down.

- **Structured:** Data is organized in a defined format.
- **Query:** You ask questions about your data.
- **Language:** SQL provides instructions that a database understands.

Think of SQL as a conversation between you and a database.

You ask:

"Show me all customers from Hyderabad."

The database responds with the matching records.

For example:

**Imagine a customer database**

| **ID** | **Name** | **City**  | **Age** |
| ------ | -------- | --------- | ------- |
| 1      | Rahul    | Hyderabad | 24      |
| 2      | Priya    | Mumbai    | 27      |
| 3      | Arjun    | Hyderabad | 22      |
| 4      | Sneha    | Delhi     | 25      |

Table name: customers

You ask SQL:

```
SELECT *
FROM customers
WHERE city = 'Hyderabad';
```

The database returns:

| ID | Name  | City      | Age |
| -- | ----- | --------- | --- |
| 1  | Rahul | Hyderabad | 24  |
| 3  | Arjun | Hyderabad | 22  |

Notice something important.

You did not tell the database HOW to search internally. You simply described WHAT information you wanted.

This is called a **declarative language**.

That is one of SQL's most powerful characteristics.

# **2. Understanding databases, tables, rows and columns**

Before writing SQL, you must understand how relational databases organize information.

Think of an Excel spreadsheet.

A database table looks somewhat similar.

[1. SQL Crash Course - SQL Pocket Guide, 4th Edition \[Book\]](https://images.openai.com/static-rsc-4/dPWQsaArCB-yN4kNPB8KzDuWLBiExn5MCq3vpfq-oy_9FSG6y1JDOuPNuQ9EFQHvUmWqJeFtWzMni5NcVuhjo7Wrip8fiWrEZEl-aeGnP854UF9et_9CtLbroA-P4kV0ex5sd8PhP78AxAGpaDcwpqBrqXdDjppMjWuXcWf717I?purpose=inline)

[learning.oreilly.com](https://learning.oreilly.com/library/view/sql-pocket-guide/9781492090397/ch01.html?utm_source=chatgpt.com)

There are four fundamental concepts:

| Concept  | Meaning                       | Example             |
| -------- | ----------------------------- | ------------------- |
| Database | Collection of related tables  | Shopping database   |
| Table    | Collection of related records | Customers           |
| Row      | One individual record         | Rahul's information |
| Column   | One attribute of a record     | Customer name       |

For example, an e-commerce database might contain:

- `customers`
- `products`
- `orders`
- `payments`

Each table stores a particular category of information.

Why separate them?

Because storing everything in one giant table creates duplication, inconsistencies and maintenance problems.

This leads us to an important database design concept called **normalization**, which we will study later.

# **3. Your first SQL command: SELECT**

Let's begin writing SQL.

The most frequently used SQL command is `SELECT`.

It retrieves data from a table.

Syntax:

```
SELECT column_name
FROM table_name;
```

Suppose we have a table called `students`.

| id | name  | age | marks |
| -- | ----- | --- | ----- |
| 1  | Rahul | 20  | 85    |
| 2  | Priya | 21  | 92    |
| 3  | Arjun | 19  | 76    |
| 4  | Sneha | 20  | 95    |

**Example 1: Retrieve student names**

```
SELECT name
FROM students;
```

Result:

| name  |
| ----- |
| Rahul |
| Priya |
| Arjun |
| Sneha |

**Example 2: Retrieve everything**

```
SELECT *
FROM students;
```

The asterisk (`*`) means all columns.

**Example 3: Retrieve multiple columns**

```
SELECT name, marks
FROM students;
```

Result:

| name  | marks |
| ----- | ----- |
| Rahul | 85    |
| Priya | 92    |
| Arjun | 76    |
| Sneha | 95    |

Professor's observation: Don't blindly use `SELECT *` in production applications. Selecting only the columns you need can reduce unnecessary data retrieval.

# **4. Filtering data using WHERE**

Now imagine you are a university administrator.

You have 10,000 students, but you want to find students who scored more than 85 marks.

Do you manually inspect every record?

Of course not.

You use `WHERE`.

```
SELECT *
FROM students
WHERE marks > 85;
```

Result:

| id | name  | age | marks |
| -- | ----- | --- | ----- |
| 2  | Priya | 21  | 92    |
| 4  | Sneha | 20  | 95    |

The `WHERE` clause filters records based on a condition.

Common comparison operators:

| Operator | Meaning               |
| -------- | --------------------- |
| `=`      | Equal to              |
| `>`      | Greater than          |
| `<`      | Less than             |
| `>=`     | Greater than or equal |
| `<=`     | Less than or equal    |
| `<>`     | Not equal to          |

You can also combine conditions.

**AND:** Both conditions must be true.

```
SELECT *
FROM students
WHERE age >= 20
AND marks > 85;
```

**OR:** At least one condition must be true.

```
SELECT *
FROM students
WHERE age = 20
OR marks > 90;
```

**NOT:** Reverses a condition.

```
SELECT *
FROM students
WHERE NOT age = 20;
```

Think of `WHERE` as the decision-making mechanism of your query.

# **5. Sorting data using ORDER BY**

Suppose you want to see students ranked by marks.

Use `ORDER BY`.

```
SELECT *
FROM students
ORDER BY marks DESC;
```

Result:

| name  | marks |
| ----- | ----- |
| Sneha | 95    |
| Priya | 92    |
| Rahul | 85    |
| Arjun | 76    |

Two important keywords:

- `ASC` = Ascending order (smallest to largest).
- `DESC` = Descending order (largest to smallest).

Example:

```
SELECT *
FROM students
ORDER BY marks ASC;
```

By default, SQL generally uses ascending order if you don't specify a direction.

# **6. Limiting results using LIMIT**

Imagine a database containing 10 million customers.

You only want the first five records.

```
SELECT *
FROM customers
LIMIT 5;
```

This returns at most five rows.

You can combine it with sorting:

```
SELECT *
FROM students
ORDER BY marks DESC
LIMIT 3;
```

This retrieves the three highest-scoring students.

Note: `LIMIT` is supported by databases such as MySQL and PostgreSQL. SQL Server uses `TOP` or `OFFSET/FETCH` instead.

# **7. Aggregate functions: Making sense of large data**

Now we move from retrieving individual records to analyzing entire datasets.

Imagine you are managing a university with 50,000 students.

You want to know:

- What is the average score?
- What is the highest score?
- How many students are enrolled?
- What is the lowest score?

SQL provides aggregate functions.

| Function  | Purpose                           |
| --------- | --------------------------------- |
| `COUNT()` | Counts records or non-NULL values |
| `SUM()`   | Calculates total                  |
| `AVG()`   | Calculates average                |
| `MAX()`   | Finds maximum                     |
| `MIN()`   | Finds minimum                     |

Examples:

**Count students**

```
SELECT COUNT(*)
FROM students;
```

**Calculate average marks**

```
SELECT AVG(marks)
FROM students;
```

**Find highest marks**

```
SELECT MAX(marks)
FROM students;
```

**Calculate total marks**

```
SELECT SUM(marks)
FROM students;
```

This is where SQL becomes particularly useful in data analytics.

# **8. GROUP BY: The real power of SQL**

Let's introduce a slightly more sophisticated idea.

Imagine a company with employees working in different departments.

| employee | department | salary |
| -------- | ---------- | ------ |
| Rahul    | IT         | 60000  |
| Priya    | HR         | 45000  |
| Arjun    | IT         | 75000  |
| Sneha    | HR         | 55000  |
| Karan    | Sales      | 50000  |

The management wants to know the average salary of each department.

How would you solve this?

You use `GROUP BY`.

```
SELECT
    department,
    AVG(salary)
FROM employees
GROUP BY department;
```

Result:

| department | average salary |
| ---------- | -------------- |
| IT         | 67500          |
| HR         | 50000          |
| Sales      | 50000          |

What happened?

1. SQL examined the department column.
2. It grouped employees with the same department.
3. It calculated the average salary for each group.
4. It returned one result per department.

**Important distinction:**

`WHERE` filters individual rows before grouping.

`HAVING` filters groups after grouping.

Example:

```
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
```

This returns departments whose average salary is greater than 50,000.

# **9. JOIN: Connecting multiple tables**

This is arguably one of the most important concepts in SQL.

Let's say you run an online shopping company.

You have two tables.

**Customers**

| customer_id | name  |
| ----------- | ----- |
| 1           | Rahul |
| 2           | Priya |
| 3           | Arjun |

**Orders**

| order_id | customer_id | amount |
| -------- | ----------- | ------ |
| 101      | 1           | 2500   |
| 102      | 2           | 4000   |
| 103      | 1           | 1500   |

Notice something?

The orders table does not store the customer's name. It stores the `customer_id`.

Why?

Because the same customer can place multiple orders. We don't want to repeatedly store their personal information in every order record.

Instead, we connect the tables using a common column.

This is called a **JOIN**.

[Mastering SQL Joins and Window Functions with Real Examples - DEV Community](https://images.openai.com/static-rsc-4/eVr11m91IIYD9m2OtErNyRMYxFP5i1tr0i6W1pzkZMv3ql8oSa-GmmysrsR3L0ZrEJxZEQ-EmZza6U0NtnLb_cNYOAHGU7tDwQ5PL_v05EsqHzJ_7T2r1P8LZts5Seer7_EgTmYP79nPDND-GTE2Zyao22xQz0s43gm8d7TguKE?purpose=inline)

[dev.to](https://dev.to/isika_millicent/mastering-sql-joins-and-window-functions-with-real-examples-5a6n?utm_source=chatgpt.com)

**INNER JOIN**

```
SELECT
    customers.name,
    orders.order_id,
    orders.amount
FROM customers
INNER JOIN orders
ON customers.customer_id = orders.customer_id;
```

Result:

| name  | order_id | amount |
| ----- | -------- | ------ |
| Rahul | 101      | 2500   |
| Priya | 102      | 4000   |
| Rahul | 103      | 1500   |

The database connects the matching records.

Other important JOIN types:

- `INNER JOIN`: Returns matching records from both tables.
- `LEFT JOIN`: Returns all records from the left table and matching records from the right.
- `RIGHT JOIN`: Returns all records from the right table and matching records from the left.
- `FULL OUTER JOIN`: Returns matching and non-matching records from both tables.

These are foundational concepts for real-world database work.

# **10. SQL commands: The four major categories**

SQL commands can be grouped by their purpose.

| Category | Full form                    | Purpose                    |
| -------- | ---------------------------- | -------------------------- |
| DDL      | Data Definition Language     | Defines database structure |
| DML      | Data Manipulation Language   | Modifies data              |
| DQL      | Data Query Language          | Retrieves data             |
| TCL      | Transaction Control Language | Manages transactions       |

Some commonly used commands:

| Command    | Purpose                            |
| ---------- | ---------------------------------- |
| `CREATE`   | Creates a table or database        |
| `ALTER`    | Modifies table structure           |
| `DROP`     | Deletes a database object          |
| `INSERT`   | Adds records                       |
| `UPDATE`   | Modifies records                   |
| `DELETE`   | Removes records                    |
| `SELECT`   | Retrieves records                  |
| `COMMIT`   | Saves a transaction                |
| `ROLLBACK` | Reverts an uncommitted transaction |

For example, creating a table:

```
CREATE TABLE students (
    id INT,
    name VARCHAR(100),
    age INT,
    marks DECIMAL(5,2)
);
```

Inserting a record:

```
INSERT INTO students
(id, name, age, marks)
VALUES
(1, 'Rahul', 20, 85);
```

Updating a record:

```
UPDATE students
SET marks = 90
WHERE id = 1;
```

Deleting a record:

```
DELETE FROM students
WHERE id = 1;
```

Be careful with `UPDATE` and `DELETE`: omitting the `WHERE` clause can affect every row in the table.

# **11. The SQL query execution order**

Here is a concept that separates someone who merely memorizes SQL from someone who understands it.

Consider this query:

```
SELECT department, AVG(salary)
FROM employees
WHERE salary > 30000
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY AVG(salary) DESC
LIMIT 3;
```

You write SQL in one order, but the database logically processes the query in a different order.

**Logical SQL execution order**

1. **FROM**

   Identify the source table.
2. **WHERE**

   Filter individual rows.
3. **GROUP BY**

   Form groups.
4. **HAVING**

   Filter groups.
5. **SELECT**

   Calculate and choose output columns.
6. **ORDER BY**

   Sort the results.
7. **LIMIT**

   Restrict the number of output rows.

This is the logical processing order, not necessarily the database engine's physical execution plan. A query optimizer may choose a different physical strategy.

Remember this order. It will help you understand SQL errors and write more effective queries.


# **12. Your roadmap to mastering SQL**

Learning SQL is not about memorizing 100 commands. It is about developing the ability to solve data problems.

I recommend this progression:

## **SQL learning roadmap**

1. **Level 1 — Fundamentals**

   SELECT, FROM, WHERE, DISTINCT, LIMIT, ORDER BY.

   Start here
2. **Level 2 — Data analysis**

   COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING.
3. **Level 3 — Relationships**

   Primary keys, foreign keys, INNER JOIN, LEFT JOIN, RIGHT JOIN.
4. **Level 4 — Intermediate SQL**

   Subqueries, CASE WHEN, NULL handling, UNION, CTEs.
5. **Level 5 — Advanced SQL**

   Window functions, RANK, DENSE_RANK, ROW_NUMBER, indexing, query optimization.
6. **Level 6 — Real-world projects**

   E-commerce analytics, employee analytics, customer retention and sales analysis.

**Which database should you practice on?**

I recommend starting with PostgreSQL. It is a powerful relational database with excellent SQL support.

You can practice using:

- [PostgreSQL](https://www.postgresql.org/?utm_source=chatgpt.com) — database system.
- [DB Fiddle](https://www.db-fiddle.com/?utm_source=chatgpt.com) — practice SQL in your browser.
- [SQLBolt](https://sqlbolt.com/?utm_source=chatgpt.com) — interactive SQL lessons.

## **Final thought**

Here is the mindset I want you to develop:

A beginner asks:

"What SQL command should I memorize?"

A database engineer asks:

"What question am I trying to answer with this data, and what is the most effective way to retrieve it?"

That distinction matters.

SQL is ultimately a tool for converting raw data into meaningful information.

**My recommendation:** Master SELECT, WHERE, GROUP BY and JOIN before moving to advanced SQL. These four concepts form the foundation of a substantial amount of practical SQL work.

Next, we can approach SQL as a structured university course, with lectures, progressively harder assignments, real datasets and examinations.