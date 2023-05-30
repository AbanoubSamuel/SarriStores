import {AuthReq} from "../../middlewares/auth.service";
import {Response} from "express";
import {Policy} from "../../models/policy.model";
import exp from "constants";


export const updatePolicy = async (req: AuthReq, res: Response) =>
{
    try {
        const policyId = req.query.policyId as string;
        const newPolicy = req.body.paragraph;
        console.log(newPolicy);
        console.log(policyId);
        const policy = await Policy.findById(policyId).exec();

        if (!policy) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Privacy policy not found",
                });
        }

        policy.paragraph = newPolicy;
        console.log("Policy : ", policy);

        const updatedPolicy = await policy.save();
        console.log("updatedPolicy : ", updatedPolicy);
        return res.status(200)
            .json({
                success: true,
                message: "Privacy policy updated successfully",
                policy: updatedPolicy
            });

    } catch (error) {
        return res.status(400)
            .json({
                success: false,
                message: "Failed to update a user policy !",
            });
    }
};


export const getPolicy = async (req: AuthReq, res: Response) =>
{
    const policy = await Policy.findOne({});
    if (!policy) {
        return res.status(404)
            .json({
                success: false,
                message: "Privacy policy not found",
            });
    } else {
        return res.status(200)
            .json({
                success: true,
                message: "Privacy policy updated successfully",
                policy: policy
            });
    }
};


