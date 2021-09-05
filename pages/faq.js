import Accordion from "../components/Accordion";

function faq() {
    const accordionData = [
        {
            title: 'Why TheNeuron.Club?',
            content: `Human mind is a prediction machine. Consciously and subconsciously - our mind is perenially assigning probabilities to choices. Differences in our opinions is difference in our inherent probabilities. TheNeuron.Club is a platform to harness these differences, benchmark them against truth and learn from the wisdom of the crowds.`
        },
        {
            title: 'Can you explain TheNeuron.Club in few lines?',
            content: `TheNeuron.Club is an information market on all things important to humans. Participants can trade their opinions of a future event. Clashing of opinions produces information that is of great value to the larger populace. Eventually, truth prevails, winner gets to earn while the loser gets to learn.`
        },
        {
            title: 'What service does TheNeuron.Club provide?',
            content: `At its core, TheNeuron.Club is a discovery of truth platform. In addition, TheNeuron.Club offers avenues to learn for the curious, earn for the experts and oodles of harmless fun for everyone!`
        },
        {
            title: 'How is TheNeuron.Club a “discovery of truth” platform?',
            content: `In bazaar parlance, Price is truth. Price determination requires two parties - a buyer and a seller. True price is established only upon actual trade. Much like markets, TheNeuron.Club harnesses the variances in our opinions into trading opportunities. We nudge users to look at facts closely, set a price (probability) for their opinions basis the underlying facts. As facts change, so do people’s opinion and accordingly prices. Price at any moment reflects the collective wisdom from the crowd.`
        },
        {
            title: 'I love discovery of truth, but why is money needed? Why not some higher calling?',
            content: `We do not aspire to money. But we do want markets to chase truth. Market participants need to trade with a degree of seriousness, attention and care. There must be material risk, and a reasonable upside for truth seeking to prevail. On risk and value, only “money” satisfies the requirements universally. Any other internal currency runs the risk of becoming obsolete, and thus degrading our true objective of chasing truth. We have seen this play out with all previous attempts at prediction markets.`
        },
        {
            title: 'I understand economics, can you explain to me in a simpler language?',
            content: `Using TheNeuron.Club is the cleanest way to follow constructive speculation. TheNeuron.Club will ensure the extremity and polarisation in our social discourse is curtailed at the edges. Quoting current Finance Secretary, TV Somanathan (Economics of Derivatives); “There is a long standing consensus between economic stalwarts (Adam Smith, Alfred Marshall) that speculation has a stabilising influence on prices. Logic is simple, for speculation to work selling price has to be higher than buying price. Thus, pricing experts increase the demand when prices are low and increase the supply when prices are high. They also expend energy and time in finding information on market conditions and prospects. This twin activity of collecting information and its use in stabilising prices is also called constructive speculation”. TheNeuron.Club is a way to do constructive debates.`
        },
        {
            title: 'Agree on horse-racing. It is different. But I have grown up thinking speculation is not the right thing?',
            content: `EVERYONE we trust our money with, is speculating with it as we speak. Banks, bonds, insurers, companies funds and investment managers all use speculation to ensure money flows to the best ideas. The reason we all have stable prices and an assured return is through complex and deep net of speculation. Voting on values and trading on beliefs is the way humans have peacefully collaborated in the post WW-II era also the most peaceful since inception of humanity.`
        },
        {
            title: 'What is success for TheNeuron.Club?',
            content: `We believe difference of opinions is an opportunity to trade. Not tirade. Thus, objective debates backed with skin in the game are the cleanest way to bring virtuosity back in our social discourse. By probing people to think in probabilities, we harness our differences towards a market led price. TheNeuron.Club’s mission is to establish that everything man-made is just a probability. We believe, in a world where India would herald the coming of Information Age.`
        },
        {
            title: 'How can a user report discrepancies like fake users, incorrect event closures and other such?',
            content: `You can currently reach out through support. If an event closes incorrectly due to a human/ computer mistake, we have adequate mechanisms to reverse your trade. Gradually, much more sophisticated mechanisms to follow.`
        },
        
    ];
    return (
        <div>
            <div className="py-20">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-700 text-center mt-10">Frequently Asked Questions</h1>
                <div className="h-1 w-48 mx-auto my-3 md:my-5 bg-gray-500"></div>
                <div className="p-5">
                    {accordionData.map((item, i) => (
                        <Accordion key={i} title={item.title} content={item.content} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default faq
