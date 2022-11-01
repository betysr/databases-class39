## 3.1. **Exercise 1 : Normalization**

### 1. What columns violate 1NF?

- It states that an attribute of a table cannot hold multiple values. It must hold only single-valued attribute.
- First normal form disallows the multi-valued attribute, composite attribute, and their combinations.
- So, food_code and food_description columns violate the 1NF rule. 

### 2. What entities do you recognize that could be extracted?

- In the second normal form, all non-key attributes are fully functional dependent on the primary key.
- We can extract member_name, member_address, venue_description, and food_description columns.

### 3. Name all the tables and columns that would make a 3NF compliant solution.

 - A relation will be in 3NF if it is in 2NF and not contain any transitive partial dependency.
 - 3NF is used to reduce the data duplication. It is also used to achieve the data integrity.
 - If there is no transitive dependency for non-prime attributes, then the relation must be in third normal form.

    - Member table : member_id, member_name, member_address
    - Dinner table : dinner_id, dinner_date, venue_code , food_code
    - Venue Table : venue_code, venue_description
    - Food Table : food_code, food_description 