const Gender = {
    Male: "MALE",
    Female: "FEMALE"
}

const StoryChannel = {
    Blog: "BLOG",
    Tv: "TV",
    Radio: "RADIO"
}

const StoryType = {
    Story: "STORY",
    BreakingNews: "BREAKINGNEWS",
}

const StoryStatus = {
    Open: "OPEN",
    Submitted: "SUBMITTED",
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
        Read: { 
            All: "Story.Read.All",
            Submitted: "Story.Read.Submitted",
            Approved: "Story.Read.Approved", 
            Rejected: "Story.Read.Rejected", 
            Published: "Story.Read.Published",
            Scheduled: "Story.Read.Scheduled",
            One: "Story.Read.One" 
        },
        Create: "Story.Create",
        Update: "Story.Update",
        Delete: "Story.Delete",
        CreateBNews: "Story.CreateBNews",
        Approve: "Story.Approve",
        Reject: "Story.Reject",
        Publish: "Story.Publish",
        Schedule: "Story.Schedule",
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
    },
    Tag: {
        Read: "Tag.Read",
        Create: "Tag.Create",
        Update: "Tag.Update",
        Delete: "Tag.Delete"
    }
}
const getAllPermissions = () => {
    let allPermissions = [];
    for(let prop in RolePermissions){
        allPermissions.push(...getPermissions(prop));
    }
    
    return allPermissions;
}

const getPermissions = (permissionName) => {
    return findPermissions(permissionName, RolePermissions);
}

function findPermissions(permissionName, permissionsObject){ 
    let permissions = [];
    let keys = permissionName.split('.');
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

module.exports = { Gender, StoryChannel, StoryStatus, StoryType, StorySectionType, AuthorType, RolePermissions, getAllPermissions, getPermissions }