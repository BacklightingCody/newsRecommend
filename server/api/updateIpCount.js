module.exports = { async updateIpAttempts(db, ipAddress, maxAttempts, freezeTime, now) {
    const ipRecord = await db.collection('IPBlackList').findOne({ ipAddress });
    if (!ipRecord) {
        await db.collection('IPBlackList').insertOne({ ipAddress, attempts: 1, frozenUntil: null });
    } else {
        const newAttempts = (ipRecord.attempts || 0) + 1;
        let updateFields = { attempts: newAttempts };

        if (newAttempts >= maxAttempts) {
            updateFields.frozenUntil = new Date(now.getTime() + freezeTime);
        }

        await db.collection('IPBlackList').updateOne(
            { ipAddress },
            { $set: updateFields }
        );
    }
}}