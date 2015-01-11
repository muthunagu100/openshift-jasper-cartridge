--
--
-- 5.2.0 to 5.5.0
--
-- Fix for bug 33491 - REST2: Resources: Delete often fails with constraint violation error on jiaccessevent table
--
    alter table JIAccessEvent
        drop foreign key FK47FB3CD7F254B53E;

    alter table JIAccessEvent
        add constraint FK47FB3CD7F254B53E
        foreign key (resource_id)
        references JIResource
        on delete cascade;
-- Fix for the bug 32398 - REST: (Mysql, SqlServer, Oracle): can't create resource with PUT request
    alter table JIDataType
        alter column minValue set data type varchar(1000) for bit data
        alter column max_value set data type varchar(1000) for bit data;