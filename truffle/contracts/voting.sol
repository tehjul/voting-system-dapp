// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A voting system
 * @author Julien S. (forked from Cyril Castagnet)
 * @notice You can use this contract to automate a vote. Only the owner of the contract can change the workflowstatus and add new voters. Voters must be registered by the owner to add new proposals, to vote, or to get informations.
 */
contract Voting is Ownable {
    /**
     * @return winningProposalID An uint of the winning proposal ID.
     */
    uint256 public winningProposalID;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
    }

    struct Proposal {
        string description;
        uint256 voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /**
     * @return workflowStatus An uint of the current workflow status.
     */
    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping(address => Voter) voters;

    /**
     * @dev Emitted on each new registration of a voter.
     */
    event VoterRegistered(address voterAddress);

    /**
     * @dev Emitted when the workflow status has been changed.
     */
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    /**
     * @dev Emitted when a new proposal has been registered.
     */
    event ProposalRegistered(uint256 proposalId);

    /**
     * @dev Emitted when a voter has voted.
     */
    event Voted(address voter, uint256 proposalId);

    /**
     * @dev Throws if called by any account other than a registered voter.
     */
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
     * @dev Returns the struct Voter of a given address.
     * @param _addr The address of a voter.
     * @return Voter A struct with isRegistered(bool) hasVoted(bool) and votedProposalId(uint).
     *
     * Get a voter informations.
     *
     * Requirements:
     *
     * - Only registered voters can call this function.
     */
    function getVoter(address _addr)
        external
        view
        onlyVoters
        returns (Voter memory)
    {
        return voters[_addr];
    }

    /**
     * @dev Returns the struct Proposal of a given id.
     * @param _id The id of a proposal.
     * @return Proposal A struct with description(string) voteCount(uint).
     *
     * Get a proposal informations.
     *
     * Requirements:
     *
     * - Only registered voters can call this function.
     */
    function getOneProposal(uint256 _id)
        external
        view
        onlyVoters
        returns (Proposal memory)
    {
        return proposalsArray[_id];
    }

    /**
     * @dev Returns an array of Proposal.
     * @return Proposal[] A array of struct Proposal with description(string) voteCount(uint).
     *
     * Get all proposals informations.
     *
     * Requirements:
     *
     * - Only registered voters can call this function.
     */
    function getProposals()
        external
        view
        onlyVoters
        returns (Proposal[] memory)
    {
        return proposalsArray;
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    /**
     * @dev Sets the variable isRegistered of struct Voter to true.
     * @param _addr The address of the voter to register.
     *
     * Add an address to be registered as a voter.
     *
     * Emits a {VoterRegistered} event indicating the address registered.
     *
     * Requirements:
     *
     * - Only owner of the contract can call this function.
     * - Workflow Status must be set to RegisteringVoters.
     * - `_addr` must not be already registered.
     */
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    /**
     * @dev Add a proposal to the array proposalsArray.
     * @param _desc The description of the proposal to add.
     *
     * Add a new proposal.
     *
     * Emits a {ProposalRegistered} event indicating the id of the added proposal.
     *
     * Requirements:
     *
     * - Workflow Status must be set to ProposalsRegistrationStarted.
     * - `_desc` must not be empty.
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        ); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
     * @dev Sets votedProposalId to the given id and hasVoted to true for the caller. Sets the winningProposalId if voteCount > actual winningProposalId.
     * @param _id The id of the proposal to vote for.
     *
     * Vote for a proposal.
     *
     * Emits a {Voted} event indicating the address of the caller and the id of the voted proposal.
     *
     * Requirements:
     *
     * - Workflow Status must be set to VotingSessionStarted.
     * - `_id` must exists.
     * - Caller must not have already voted.
     */
    function setVote(uint256 _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        if (
            proposalsArray[_id].voteCount >
            proposalsArray[winningProposalID].voteCount
        ) {
            winningProposalID = _id;
        }

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /**
     * @dev Sets workflowStatus to ProposalsRegistrationStarted.
     *
     * Change the current status to ProposalsRegistrationStarted.
     * Add a Genesis proposal with the id 0.
     *
     * Emits a {WorkflowStatusChange} event indicating the old status and the new status.
     *
     * Requirements:
     *
     * - Only owner of the contract can call this function.
     * - Workflow Status must be set to RegisteringVoters.
     */
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /**
     * @dev Sets workflowStatus to ProposalsRegistrationEnded.
     *
     * Change the current status to ProposalsRegistrationEnded.
     *
     * Emits a {WorkflowStatusChange} event indicating the old status and the new status.
     *
     * Requirements:
     *
     * - Only owner of the contract can call this function.
     * - Workflow Status must be set to ProposalsRegistrationStarted.
     */
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /**
     * @dev Sets workflowStatus to VotingSessionStarted.
     *
     * Change the current status to VotingSessionStarted.
     *
     * Emits a {WorkflowStatusChange} event indicating the old status and the new status.
     *
     * Requirements:
     *
     * - Only owner of the contract can call this function.
     * - Workflow Status must be set to ProposalsRegistrationEnded.
     */
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /**
     * @dev Sets workflowStatus to VotingSessionEnded.
     *
     * Change the current status to VotingSessionEnded.
     *
     * Emits a {WorkflowStatusChange} event indicating the old status and the new status.
     *
     * Requirements:
     *
     * - Only owner of the contract can call this function.
     * - Workflow Status must be set to VotingSessionStarted.
     */
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /**
     * @dev Sets workflowStatus to VotesTallied.
     *
     * Change the current status to VotesTallied.
     *
     * Emits a {WorkflowStatusChange} event indicating the old status and the new status.
     *
     * Requirements:
     *
     * - Only owner of the contract can call this function.
     * - Workflow Status must be set to VotingSessionEnded.
     */
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
