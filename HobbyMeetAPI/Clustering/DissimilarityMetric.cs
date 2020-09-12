using System;
using Aglomera;


namespace HobbyMeetAPI.Clustering
{
    class DssimilarityMetric : IDissimilarityMetric<UserScore>
    {
        public double Calculate(UserScore i1, UserScore i2)
        {
            return Math.Sqrt((i1.ActivityScore - i2.ActivityScore) * (i1.ActivityScore - i2.ActivityScore) +
                             (i1.ArtScore - i2.ArtScore) * (i1.ArtScore - i2.ArtScore) +
                             (i1.CollectingScore- i2.CollectingScore) * (i1.CollectingScore - i2.CollectingScore) +
                             (i1.CraftScore - i2.CraftScore) * (i1.CraftScore - i2.CraftScore) +
                             (i1.GameScore - i2.GameScore) * (i1.GameScore - i2.GameScore) +
                             (i1.SportScore - i2.SportScore) * (i1.SportScore - i2.SportScore));
        }
    }
}
