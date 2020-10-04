const Gender = {
    Male: "MALE",
    Female: "FEMALE"
}

const StoryChannel = {
    Blog: "BLOG",
    Tv: "TV",
    Radio: "RADIO"
}

const StoryStatus = {
    Open: "OPEN",
    Submitted: "Submitted",
    Approved: "APPROVED",
    Published: "PUBLISHED",
    Rejected: "REJECTED",
    Scheduled: "SCHEDULED"
}

const StorySectionType = {
    Text: "TEXT",
    Image: "IMAGE"
}

const AuthorType = {
    Author: "AUTHOR",
    Guest: "GUEST_AUTHOR",
}

const RolePermissions = {
    User: {
        Read: { All: "User.Read.All", One: "User.Read.One" },
        Create: "User.Create",
        Update: "User.Update",
        Delete: "User.Delete"
    },
    Role: {
        Read: "Role.Read",
        Create: "Role.Create",
        Update: "Role.Update",
        Delete: "Role.Delete"
    },
    Story: {
        Read: "Story.Read",
        Create: "Story.Create",
        Update: "Story.Update",
        Delete: "Story.Delete"
    },
    Category: {
        Read: "Category.Read",
        Create: "Category.Create",
        Update: "Category.Update",
        Delete: "Category.Delete"
    },
    Image: {
        Read: "Image.Read",
        Create: "Image.Create",
        Update: "Image.Update",
        Delete: "Image.Delete"
    },
    Comment: {
        Read: "Comment.Read",
        Create: "Comment.Create",
        Update: "Comment.Update",
        Delete: "Comment.Delete"
    }
}

const getPermissions = (permissionName) => {
    return findPermissions(permissionName, RolePermissions);
}

function findPermissions(permissionName, permissionsObject){  
    let keys = permissionName.split('.');
    let permissions = [];
    let permissionNameValue = permissionsObject[keys[0]];

    if(permissionNameValue === undefined || !(typeof(permissionNameValue) === "string" || typeof(permissionNameValue) === "object"))
    return [];
    
    if(typeof(permissionNameValue) === "string"){
        return [permissionNameValue];
    }

    if(keys.length === 1){
        for(let prop in permissionNameValue){
            permissions.push(...findPermissions(prop, permissionNameValue));
        }
        return permissions;
    }

    let [,...others] = keys;
    return [...findPermissions(others.join('.'), permissionNameValue)];
}

module.exports = { Gender, StoryChannel, StoryStatus, StorySectionType, AuthorType, RolePermissions, getPermissions }