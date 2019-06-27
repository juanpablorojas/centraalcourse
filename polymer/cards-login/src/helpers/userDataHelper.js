
function formatUserData(rawData) {
    return rawData.map((person) => {
        return {
            'name': person.name.first.concat(' ',person.name.last),
            'gender': person.gender,
            'image': person.picture.medium
        };
    });
}
